'use client'

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Plan {
  id: string;
  type: 'workout' | 'meal';
  plan: any;
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
        <p>You haven't created any plans yet.</p>
      ) : (
        <ul>
          {plans.map(plan => (
            <li key={plan.id} className="mb-4 p-4 bg-white/10 rounded-lg">
              <h2 className="text-xl font-semibold">{plan.type === 'workout' ? 'Workout Plan' : 'Meal Plan'}</h2>
              <p>Created on: {plan.createdAt.toLocaleDateString()}</p>
              <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(plan.plan, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPlans;