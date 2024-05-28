//https://www.youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA
//Net Ninja Tutorial

 

// data,i-e documents are stored as BSON format(Binary JSON),, looks like JSON 
// each document is identified by a unique id value, generrated by mongo
// documents can be a nested 


 
  const {number, city, country, year, month,population,area,pages,name,msg  } = req.body

      //  const insertedDoc = await ID.insertOne( { //no insertOne in Mongoose
        const insertedDoc = new ID( {

            resident:residentId,
            population:population,
            area:area,
            pages:pages,
            reviews:{
                name:name,
                msg:msg,
            },
            
            PersonalID:{
            numberID:number,
            issuePlace:{city:city,country:country},
            expiryDate: {year:year,month:month}
           } 
        
        })

          const newPersonal =  await insertedDoc.save() // will be saved at ids collection
        //console.log('newAddress',newAddress)
        //---- for line 47
         
            
        //------
        ID.find().count()
        ID.find().limit(3).count()
        ID.find().sort({resident:1}).limit(3).count() // 1:assending order,,-1:desending order
          
        //--- Comparison operators----Greater than,,Less than,, equal
        ID.find({pages:{$gt:200}}) //find in db docs with pages > 200
        $ne --> not equal find({name:{$ne:"brhooma"}})//---> find all docs with name != brhooma
        $gt  -- >
        $lt --  <
         $ lte -- <=
         $ gte -- >=
         find({gpa:{$gte:3, $lte:4}}) //  3=< gpa =<4
         //--Logocal Operators ----- expressions returns-- true or false
            $or  -- OR
            $and
            find({$and:[{fullTime:true},{age:{$lte:22}}]})
            $not
            $nor

            $all -- 
            $in --> //return all records that have one of these matching values
            find({name:{$in:["ibra","isra","hsn"]}}) //return all records that have one of these names
            $nin -->--> //return all records that dont have one of these matching values

            $set---changes values and creates a new field
            $unset --- remove a field completly
            updateOne
            updateMany
            $inc --- increment a value by certain amount
            $pull ---> pull a field from an array
            $push
            $each
      updateMany({ city:{$exists:false},{$set:{city:true}}})
            $exists:false --- does it not exists
         

  deleteOne({city:"Kanata"}) ---> delete doc inwhich city is Kanata
 deleteMany({country:canada})  // delete any doc with country=canada  
 deleteMany({population:{$exists:false}}) // delete all docs that doesNOT have population field
        //---
find({pages:{$gt:200},area:{$lte: 5000}}) 
       
         //-- OR operator
find({ $or:[{pages:{$gt:200}}, {area:{$lte: 5000}}] }) 
         
        //----- $in
.find({ rating:{$in:[7,8,9]} }) //find all books where rating is in this list of values 7,8,9
         
          // above is equivalent to --->  ID.find({$or:[{rating:7},{rating:8},{rating:9}] }) 
        //----- $NOT in,,, $nin
.find({ rating:{$nin:[7,8,9]} }) //find all books where rating is in this list of values 7,8,9

// querry arrays, not nested
.find({ reviews: "fantasy" }) //find in the array a document that contains ,value = fantasy, including others
.find({ reviews: ["fantasy"] }) //find in the array a document that only contains ,value = fantasy
.find({ reviews: ["fantasy","magic"] }) //find in the array a document that only contains ,value = fantasy and magic
        // $all == AND
.find({ reviews: {$all: ["fantasy","sci-fi"]} }) //find in the array a document that contains ,value = fantasy and magic, may include others
        // querry nested arrays,,
.find({'PersonalID.numberID': "sssdd5585544"})//  worked fine

        //delete one document
.deleteOne({_id: ObjectId("6563ba9cc25d89cf44a1e561")})
        //Delete many docs
.deleteMany({population:'50000' })
.deleteMany({'reviews.name':'Hussein'} )
.find({resident:req.params.id, recent:true})  //NOT find({},{}), but find({xxxx , xxxx})
  // Projection parameter: 2nd argument in find({query parameter},{projection parameter})
 .find({},{_id:false,street:true})  
  //(or street:1),,return all documents but show street ONLY,, .find({},{_id:false,street:true, city:1}) 
  //_id:false, dont show _id 

})
//update methods:::    https://www.youtube.com/playlist?list=PLWkguCWKqN9OncFtHmijyW0VS6f5BEKpV

update({query},{update},{options}) --> one or many docs,, updates 1st matching doc then STOP .. 
updateOne({query},{update},{options}) --> update just one doc
updateMany({query},{update},{options}) --> updates many docs
replaceOne({'index':1},{'index':1,isValid:true,"cart":[1,2,3]},{options}) --> replaces content of a doc with an object
***
method({query},{update},{options}),,method can be any of the above 4
update({query},{update},{multi:true})--> update multiple docs,,same update to all docs
updateOne({index:3},{$set:{customer:{cartId:NumberInt(25),age:NumberInt(27)},cart:[]},$unset:{newOrder:1}})///both $set & $unset in one update
//update operators:::
$set, $unset, $rename,, $inc, $mul, $currentDate, $pop, $addToSet
update({index:3},{ // using multiple operators at once
                    $set:{customer:{cartId:NumberInt(25),age:NumberInt(27)},cart:[]},
                    $unset:{newOrder:1},
                    $rename:{street:"road", house:"saakan"}//rename field names to another,, not changing the value
                  },
                  {
                    multi:true // 
                  })///both $set & $unset in one updateOne, removes newOrder field
update({cartId:{$exists:true}}, --// if update()->must use multi:true option, otherwise use updateMany() 
  {$rename:{cartId:"orderId"}},
  {multi:true} // if update()->must use multi:true option, otherwise use updateMany() 
  )

// $currentDate()
updateMany({updatedAt:{$exists:false}},{$currentDate:{updatedAt:true}},{})// find all docs the does NOT contain updatedAt field,then add this field with current date as its value

// Array Update Operators
$ $push, $addToSet, $pull, $pullAll, $pop, $each, $elemMatch, $inc /// $each is a modifier operator 
$push
update({cartId:55},{$push:{cartArray:{$each:[ "item1", "item2","item3","item1"]}}})//cart array will be created automatically if does not exist...add each element to the array 
$addToSet
update({cartId:55},{$addToSet:{cartArray:{$each:[ "item1", "item2","item3"]}}})//if "item1" exists it will NOT be Added ,, cart array will be created automatically if does not exist... 
$pop //removes one element: 1st or last element from the array
update({indexId:7},{$pop:{cartArray:1 }})// 1:removes last,, -1:removes first, element from the array
$pull // removes several elements based on conditions
update({_id:777},{$pull:{cartArray:<element|conditional_operator> }})// 1:removes last,, -1:removes first, element from the array
update({_id:777},{$pull:{array_1: "item1",array_2:{$gt:400}  }})// remove "item1" from array_1,and remove all values >400 from array_2,  
$pullAll//removes certain elements from the array 'in array form'
update({_id:666},{$pullAll:{array_1: ["item1", "item5","item16","item3"] }})// remove all these items, even if some of them are doublicate  
update({_id:666},{$pull:{array_1: {$in:["item1", "item5","item16","item3"] }}})// performs as the above one exactly 
$  // positional operator --> $ points dynamically to the index of the element in the arary
update({_id:555, array3:"item2"},{$set:{'array3.$': "updatedItem2"}})//.$ means the index of "item2" of array3, update its value to "updatedItem2" for the docs with that filter 
update({_id:555, array3:"item3"},{$unset:{'array3.$': 1}})//updates "item3" to "null" in array3,.$ means the index of "item3" of array3, , for the docs with that filter 
$ // in nested arrays
let array4 = [{title:"TV",price:340,quantity:7},{title:"Phone",price:560,quantity:6},{title:"PC",price:750,quantity:4}]
update({"array4Id":456,'array4.title':"phone"},{$set:{'array4.$.price':450}})//update the price field for the object whose index is one [phone index,according to the filter]
$elemMatch //Positional Operator $ with $elemMatch,, atleast 2 fields are used for matching
let array5 = [{title:"TV",price:340,quantity:7},{title:"Phone",price:560,quantity:6},{title:"PC",price:750,quantity:4}]
updateOne({"array5Id":567,array5:{$elemMatch:{title:"PC",price:750}}},{$set:{'array5.$.quantity':7}})//elementMatching operator;in array5 find the index(from.$) of object using elemMatch, then update a value in that object
$inc // increment by certain value
updateOne({"array6Id":567,array5:{$elemMatch:{title:"PC",price:750}}},{$inc:{'array5.$.quantity':NumberInt(7)}})//increment the value by 7, elementMatching operator;in array5 find the index(from.$) of object using elemMatch, then update a value in that object
//DELETE
remove(),deleteOne(),deleteMany()
//remove()
remove({query}) // removes docs that match the query
remove({query},true) // removes just one doc that matches the query
remove({},true) // removes the first doc in the collection
remove({}) //removes all docs in the collection
//dleteOne()
deleteOne({query})//deletes the doc matching the quey
deleteOne({})// deletes the first doc in the collection
//deleteMany()
deleteMany({query})// deletes all docs that match the query
deleteMany({_id:{$ne:1234}}) // delete all docs not equal to 1234
deleteMany({}) //deletes all docs in the collection
// drop() --> deletes the collection itself
COLLECTION.drop() // removes the collection and its contents
//dropDatabase()  -- removes entire db including all collections in it
db.dropDatabase()  


const updateDoc = asyncHandler( async (req, res) => {
        const docId = req.params.id
       const {number, city, country, year, month,population,area,pages,name,msg  } = req.body
        ID.updateOne({resident:docId}, {$set: {pages:pages, population:population, 'PersonalID.numberID':number,'PersonalID.issuePlace.city':city  }})
         
        // updateOne({filter},{update}) 
        ID.updateMany({pages:'600'}, {$set: {area:area, population:population }})
        
        updateMany({ city:{$exists:false},{$set:{city:true}}})------city does NOT exists, add city field to any doc doesNOT have it
        updateOne({pages:'600'}, {$unset: {area: ""}}),, remves area field completly

        //all docs with pages property that equals 600, change area&population to the new values
        
        await ID.updateOne({_id:docId}, {$inc: {pages: 7 }})//increment pages by 7 or -7
        await ID.updateOne({_id:docId}, {$pull: {colors:  'Green' }})//remove green color from the colors array
        await ID.updateOne({_id:docId}, {$push: {colors:  'Yellow' }})//push yellow color to the colors array
        await ID.updateOne({_id:docId}, {$push: {colors:  {$each:['Blue','Brown','White']} }}) 
      //  push each element in this array,['Blue','Brown','White'],  to the colors array
        await Address.updateOne({filter},{update})  
  Address.updateOne({resident:req.params.id, recent:true},{$set:{city,street, moveInAddress}})  //will update city&street and add moveInDate,if was not in the doc   
  PASSPORT.updateOne({resident:residentID}, {$set: {'Passport.expiryDate.month':month, 'Passport.expiryDate.year':year, 'Passport.number':number, 'Passport.issuePlace.country':country,'Passport.issuePlace.city':city  }})
  ID.updateOne({resident:docId}, {$set: {pages:pages, population:population, 'PersonalID.numberID':number,'PersonalID.issuePlace.city':city  }})
     
    ID.updateMany({pages:'600'}, {$set: {area:area, population:population }})
         
//INDEXES 
find({name:"Ibra"}).explain("executionStats"),, //this give execution stats of this query
//Linear search takes alot of time.. So we create indexes --Mongo already created one index for us,, _id
collectionName.createIndex({name:1}) -->// name_1 ,, index name created by mongo
collectionName.getIndexes() -// gives all indexes
collectionName.dropIndex("name_1") //deletes the index
//-----------------------
//put limits on collections--
Db.createCollection("teachers",
{capped:true, // inform mongodb this collection should have a maximum size
size:1000000, // 10 million bytes as max size
max:100 // I can have only 100 documents in this collection
},{
autoIndexId:true //or false,, automatically apply index to object, we can toggle that to be true or false
}
)
 

    