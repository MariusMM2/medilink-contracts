const Contract = require("../models/contract.model");

function createContract(req, res) {

  console.log("req.body: ", req.body);

  // check if there is already a contract with the same name in the database
  Contract.findOne({
    where: {
      name: req.body.name
    }
  }).then(contractDB => {
    // if there is not already a contract with that name in the database
    if(!contractDB) {

      Contract.create(req.body).then(contract => {
        console.log("created: ", contract);

        res.json({
          status: 200,
          message: 'Contract successfully created!',
          contract
        });

      }).catch((err) => {
        res.send({
          error: err
        });
      });
    } else {
      res.json({
        status: 400,
        message: "A contract with this name already exists!"
      });
    }
  }).catch((err) => {
    res.send({
      error: err
    });
  });

}

function readContract(req, res) {

  // find a contract in the database based on the id from the url
  Contract.findOne({
    where: {
      id: req.params.id
    }}).then(contract => {
    console.log(contract);
    if(!contract) {
      res.json({
        status: 400,
        message: "There is no contract with this id in the database!"
      });
    }
    res.send(contract);
  }).catch((err) => {
    res.send({
      error: err
    });
  });

}

function readAllContracts(req, res) {

  Contract.findAll().then(contracts => {
    if(!contracts) {
      res.json({
        status: 400,
        message: "There are no contracts in the database!"
      });
    }
    res.send(contracts);
  }).catch((err) => {
    res.send({
      error: err
    });
  });

}

function updateContract(req, res) {

  console.log("req.body: ", req.body);

  // check if there is already a contract with the same name in the database
  Contract.findOne({
    where: {
      name: req.body.name
    }
  }).then(contract => {
    // if there is a contract found with this name and if the it is a different than the one that is being modified

    if(contract && (contract.id.toString() !== req.params.id.toString()) ) {
      res.json({
        status: 400,
        message: "A contract with the updated name already exists!"
      });
    } else {

      Contract.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.json({
          status: 200,
          message: "Successfully updated contract!"
        });
      }).catch((err) => {
        res.send({
          error: err
        });
      });
    }

  }).catch((err) => {
    res.send({
      error: err
    });
  });


}

function deleteContract(req, res) {

  Contract.destroy({
    where: {
      id: req.params.id
    }}).then(deletedContract => {
    console.log(deletedContract);
    res.json({
      status: 200,
      message: "Successfully deleted!"
    });
  }).catch((err) => {
    res.json({
      status: 400,
      message: "Deletion failed!",
      error: err
    });
  });

}

module.exports = {
  createContract,
  readContract,
  readAllContracts,
  updateContract,
  deleteContract
};
