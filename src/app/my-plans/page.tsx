'use client'

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Plan {
  id: string;
  type: 'workout' | 'meal';
  imageUrl: string;
  createdAt: Date;
}

const MyPlans: React.FC = () => {
  const { user, loading } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user) {
        const q = query(
          collection(db, 'plans'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedPlans = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as Plan[];
        setPlans(fetchedPlans);
      }
    };

    fetchPlans();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your plans</h1>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Plans</h1>
      {plans.length === 0 ? (
        <p>You haven&apos;t created any plans yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="border rounded-lg overflow-hidden">
              <Image 
                src={plan.imageUrl} 
                alt={`${plan.type} plan`} 
                width={500} 
                height={300} 
                layout="responsive"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{plan.type === 'workout' ? 'Workout Plan' : 'Meal Plan'}</h2>
                <p>Created on: {plan.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlans;