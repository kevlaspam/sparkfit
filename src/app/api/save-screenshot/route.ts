import { NextResponse } from 'next/server';
import { auth, storage, db } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { imageData, planType } = await req.json();
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `screenshots/${user.uid}/${Date.now()}.png`);
    await uploadString(storageRef, imageData, 'data_url');
    const imageUrl = await getDownloadURL(storageRef);

    // Save metadata to Firestore
    const docRef = await addDoc(collection(db, 'plans'), {
      userId: user.uid,
      type: planType,
      imageUrl: imageUrl,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, docId: docRef.id });
  } catch (error) {
    console.error('Error saving screenshot:', error);
    return NextResponse.json({ error: 'Failed to save screenshot' }, { status: 500 });
  }
}