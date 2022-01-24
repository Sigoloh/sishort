import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity()
export class Link {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column({unique: true}) 
   alias: string; 
   
   @Column() 
   url: string; 

}
