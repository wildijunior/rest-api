import path from 'path'
export default{
    getIndex(req, res){
        res.render(path.resolve('src/views/index'))
    }
}