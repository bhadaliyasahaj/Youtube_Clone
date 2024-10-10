export interface Room{
    totalRooms:number;
    availableRooms:number;
    bookedrooms:number;
}

export interface RoomList{
    roomNumber?:string;
    roomType:string;
    amenities:string;
    price:number;
    photos:string;
    checkinTime:Date;
    checkoutTime:Date;
    rating:number;
}