const products = require("../data/products")

module.exports = {
    find : function(req, res) {
        res.json(products);
    },

    create : function(req, res){
        const {name, price} = req.body;
        const newProduct = [...products, {id: products.length+1,name, price}];
        console.log("Đã thêm sản phẩm mới");
        res.json(newProduct);
    },

    delete : function(req, res){
        const deleteId = req.params.id;
        const newProducts = products.filter((product) => product.id != deleteId);
        console.log(`Đã xóa sản phẩm ${deleteId}`)
        res.json(newProducts);
    },

    update : function(req, res){
        const updateId = req.params.id;
        const updateInfo = req.body;
        const newProducts = products.map((product) => {
            if(product.id == updateId) {
                return {...product, ...updateInfo};
            }
            return product
        })
        console.log(`Đã cập nhật sản phẩm ${updateId}`);
        res.json(newProducts)
    }
}