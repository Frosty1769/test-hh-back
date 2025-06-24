import express from 'express'
import { ItemMove, ItemSelect } from '../schemas/item.js';
import ItemController from '../controllers/item.js'

const router = express.Router();

router.post('/select/:id', (req, res) => {
    let item = new ItemSelect(req.body)
    ItemController.selectItem(req.params.id, item.isSelected, res)
})

router.post('/move', (req, res) => {
    let item = new ItemMove(req.body)
    let search = req.query.search
    ItemController.moveList(item.prevInd, item.newInd, res, search)
})

router.get('/all', (req, res) => {
    let page = req.query.page || 1
    let search = req.query.search
    ItemController.getAllList(page, res, search)
})

export default router;