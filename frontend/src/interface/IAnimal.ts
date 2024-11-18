import { GendersInterface} from "./IGender"

export interface AnimalsInterface {
    ID?: number;
    Name?: string;
    Description?: string;
    BirthDay?: string;
    Gender?: GendersInterface;
    BehavioralID?: number;
    CategoryID?: number;
  }