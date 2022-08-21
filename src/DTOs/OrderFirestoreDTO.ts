//DTO = data transfer Object

import { FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export type OrderFirestoreDTO = {
    patrimony: string;
    descriptions: string;
    status: 'open' | 'closed',
    solution?: string;
    create_at: FirebaseFirestoreTypes.Timestamp;
    closed_at: FirebaseFirestoreTypes.Timestamp;
}