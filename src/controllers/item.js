import { Item } from "../schemas/item.js"
import { array_move } from "../utils/array.js"

//Базовые данные
var dataList = [new Item({ id: 0, text: 0, isSelected: false })]

for (let index = 1; index < 1000000; index++) {
    dataList.push(new Item({ id: Number(index), text: Number(index), isSelected: false }));
}

//Контроллер для элементов
class ItemController {
    selectItem(id, isSelected, res) {
        let index = dataList.findIndex(it => it.id == id)
        if (index === -1) {
            res.status(500).json({ status: "error", message: `get id: ${id} with ${isSelected}` })
            return
        }
        dataList[index].isSelected = isSelected
        res.status(200).json({ status: "success", message: `get id: ${id} with ${isSelected}` })
    }

    moveList(prevIndex, newIndex, res, search) {
        if (search) {
            let filtered = dataList.filter(it => it.text.includes(search))
            let _prevIndex = dataList.indexOf(filtered[prevIndex])
            let _newIndex = dataList.indexOf(filtered[newIndex])
            let newArray = array_move(dataList, _prevIndex, _newIndex)
            dataList = [...newArray];
            res.status(200).json({ status: "success" })
        } else {
            let newArray = array_move(dataList, prevIndex, newIndex)
            dataList = [...newArray];
            res.status(200).json({ status: "success" })
        }

    }

    getAllList(page, res, search) {
        let offset = 20 * (page - 1)
        res.status(200).json({
            "status": 'success',
            "data": dataList
                        .filter(it => search ? it.text.includes(search) : true)
                        .filter((it, ind) => ind >= offset && ind < 20 * page),
        })
    }
}

export default new ItemController()