import { GendersInterface} from "./Gender"

export interface AnimalsInterface {
    ID?: number;
    Name?: string;
    Description?: string;
    BirthDay?: string;
    Gender?: GendersInterface;
    BehavioralID?: number;
    CategoryID?: number;
  }