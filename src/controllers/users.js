//import { TrackModel } from '../models/nosql/tracks.js';
//import IndexModel from '../models/index.js';

const getItems = async (req, res) => {
    console.log('USUARIOS controller.getItems')
    //const data = await IndexModel.TrackModel.find({})
    //return res.send({ data })
}

const createItem = async (req, res) => {
    /*const { body } = req
    console.log('body', body)
    const data = {} //await TrackModel.create(body)
    return res.send({ data })*/
}

const usersController = {
    getItems
    //getItem,
    //createItem
    //updateItem,
    //deleteItem,
}

export default usersController;
