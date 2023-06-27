import Realm, { BSON } from 'realm';

//https://github.com/realm/realm-js/blob/main/templates/expo-template

export class Profile extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  handle!: string;
  displayName!: string;
  accountAddress!: string;
  accountNumber!: number;
  localAvatarUri?: string;
  metadataUri!: string;
  avatarUri?: string;
  tokenId?: number;
  createdAt: Date = new Date();

  static primaryKey? = '_id';
}
