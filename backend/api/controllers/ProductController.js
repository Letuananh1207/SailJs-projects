
module.exports = {
    find : async function(req, res) {
        const products = await Product.find();
        return res.json(products);
    },

    create : async function(req, res){
        const {name, price} = req.body;
        const product = await Product.create({name, price}).fetch();
        const newProducts = await Product.find();
        console.log(`Đã thêm sản phẩm mới ${product}`);
        return res.json(newProducts);
    },

    delete : async function(req, res){
        const deleteId = req.params.id;
        await Product.destroy({_id : deleteId});
        const newProducts = await Product.find();
        console.log(`Đã xóa sản phẩm thành công`)
        return res.json(newProducts);
    },

    update : async function(req, res){
        const updateId = req.params.id;
        const updateInfo = req.body;
        await Product.update({_id : updateId}, {name : updateInfo.name, price : updateInfo.price});
        const newProducts = await Product.find();
        console.log(`Đã cập nhật sản phẩm thành công`);
        return res.json(newProducts)
    }
}