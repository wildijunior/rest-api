import path from 'path'
export default{
    getDoc(req, res){
        res.render(path.resolve('src/views/doc'))
    }
}