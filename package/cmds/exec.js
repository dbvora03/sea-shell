const ora = require('ora')
const Axios = require('axios')

module.exports = async (args) => {

    const spinner = ora(`executing ${args._[1]}`).start()

    try {

        const resultCommand = await Axios({
            method: 'get',
            url: `http://localhost:8080`,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + sessionStorage.getItem('token')
            },
            body: {
                command: args._[1]
            }
        })

        
        spinner.succeed(`executed ${resultCommand.data.name}`)



    }
    catch (err) {
        spinner.fail(`execution failed: ${err}`)
    }
    finally {
        spinner.stop()
    }


  }