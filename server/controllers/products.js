import { connection } from "../sql_connection";

export const fetchAllProducts = (req, res) => {
    connection.query(`SELECT * FROM Product`,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
                return
            }
            res.status(200).json(results)
        })
}