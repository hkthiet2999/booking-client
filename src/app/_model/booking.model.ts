
export interface IBookingInterface{
    uuid:string
    userid:string
    roomid:string
    booking_id:string
    check_in_date:Date
    check_out_date:Date 
    created_date:Date
    totalPrice:number
}
export class Booking implements IBookingInterface {
    public uuid:string
    public userid:string
    public roomid:string
    public booking_id:string
    public check_in_date:Date
    public check_out_date:Date 
    public created_date:Date
    public totalPrice:number

    // constructor( uuid:string, userid:string, roomid:string, check_in_date:Date,  check_out_date:Date){
    //     this.uuid = uuid
    //     this.userid=userid
    //     this.roomid=roomid
    //     this.check_in_date=check_in_date
    //     this.check_out_date=check_out_date
    // }
    constructor(object:BookingDTO){
        this.uuid=object.uuid;
        this.booking_id=object.booking_id;
        this.userid=object.UserID;
        this.roomid=object.RoomID;
        this.created_date=object.created_date;
        this.check_in_date=object.check_in_date;
        this.check_out_date=object.check_out_date;
        this.totalPrice=object.totalPrice;
    }

    assign(object:BookingDTO){
        
    }
}

export class BookingDTO{
    public uuid:string
    public UserID:string
    public RoomID:string
    public booking_id:string
    public check_in_date:Date
    public check_out_date:Date 
    public created_date:Date
    public totalPrice:number
}
export class createBookingDTO{
    public user_id:string;
    public room_id:string;
    public check_in_date:Date;
    public check_out_date:Date;

}