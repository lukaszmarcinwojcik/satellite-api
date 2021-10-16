const express = require("express");
const router = express.Router();

const {validateToken } = require("../JWT");

const Satellite = require("../models/satellite");
const User = require("../models/user");

//Pobranie satelit po id uzytkownika
router.get("/get/:id",(req, res) => {
    Out = Satellite.find({
      user: req.params.id,
    });
  
    Out.sort({ date: -1 });
    Out.exec((err, satelliteList) => {
      if(!satelliteList){
        res.json({message: "Aktualnie nie posiadasz żadnych satelit"})
      }
    res.json(satelliteList);
  });
  });

//Dodawanie satelity
router.post("/add", validateToken, (req, res) => {
    const {body} = req;
    const satelliteData = new Satellite(body);
    satelliteData.save((err) => { 
        if (!err) {
            res.json({ message: "Dodano nowego satelite"});
        } else {
            res.json({error: err});
        }
    });
  });

  //Edytowanie satelity
  router.put("/edit", validateToken, (req, res) => {
    const {id, sideNumber, producer, model, softwareVersion, modelYear, dateOfLaunching, amountOfAmmunition, altitudeInOrbit} =
      req.body;
      editDate = new Date();
    Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        sideNumber: sideNumber,
        producer: producer, 
        model: model,
        softwareVersion: softwareVersion, 
        modelYear: modelYear,
        dateOfLaunching: dateOfLaunching,
        amountOfAmmunition: amountOfAmmunition, 
        altitudeInOrbit: altitudeInOrbit,
        editDate: editDate,
      },
      (err) => {
        if (!err) {
          res.json({
            message: `Dane satelity zostały zaktualizowane`,
          });
        } else {
          res.json({ error: err });
        }
      }
    );
  
  }); 

  //Usuwanie satelity
  router.delete("/delete/:id", validateToken, (req, res) => {
    Satellite.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (!err) {
        res.json({ message: "Satelita został usunięty"});
      } else {
        res.json({error: err});
      }
    });
  });


  module.exports = router;