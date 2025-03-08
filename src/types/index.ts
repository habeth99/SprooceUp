export interface MenuItem {
    label: string;
    view: string;
  }
  
  export interface CarInfoData {
    nickname?: string;
    license_plate: string;
    state: string;
  }

  export interface CarInfoProps {
    onNext: (info: CarInfoData) => void;
  }
  
  export interface ParkingInfoData {
    garageFloor: string;
    parkingSpace: string;
    returnTime: string;
  }

  export interface ParkingInfoProps {
    onNext: (info: ParkingInfoData) => void;
  }
  
  export interface Vehicle {
    id: string;
    nickname: string;
    license_plate: string;
    state: string;
  }
  
  export interface ReviewOrderProps {
    selectedWash: string;
    selectedTip: number;
    onTipChange: (tip: number) => void;
    carInfo?: CarInfoData;
    parkingInfo?: ParkingInfoData;
    onNext: (step: string) => void;
  }