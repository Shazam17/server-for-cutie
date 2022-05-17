var express = require('express');
const {request} = require("express");
var router = express.Router();

class WeatherModel {

  constructor(id, city, temp) {
    this.id = id;
    this.city = city;
    this.temp = temp;
  }

  static check(obj){
    const {id, city, temp} = obj;
    if(!id || !city || !temp){
      return false
    }
    return new WeatherModel(id, city, temp)
  }
}

class WeatherStorage {

  constructor() {
    this.storage = []
  }

  get(){
    return this.storage
  }

  add(weatherModel){
    this.storage.push(weatherModel)
    return weatherModel
  }

  edit(weatherModel){
    this.storage = this.storage.filter((item) => item.id !== weatherModel.id)
    this.storage.push(weatherModel)
    return weatherModel
  }

  remove(id){
    this.storage = this.storage.filter((item) => item.id !== id)
    return true
  }

}

const storage = new WeatherStorage()

router.get('/all', function(req, res, next) {
  res.json(storage.get())
});

router.post('/add', function(req, res, next) {
  const body = req.body
  console.log(body)
  const model = WeatherModel.check(body)
  if(model){
    const obj = storage.add(model)
    res.json(obj)
  }else{
    res.json({error: "validation error"})
  }
})

router.post('/edit', function(req, res, next) {
  const body = req.body
  const model = WeatherModel.check(body)
  if(model){
    const obj = storage.edit(model)
    res.json(obj)
  }else{
    res.json({error: "validation error"})
  }
})

router.post('/delete', function(req, res, next) {
  const body = req.body
  const {id} = body
  if(id){
    const obj = storage.remove(id)
    res.json(obj)
  }else{
    res.json({error: "validation error"})
  }
})

module.exports = router;
