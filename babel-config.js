module.exports = { //ESTE ARCHIVO FUNCIONA PARA QUE EL BABEL ESTE CORRECTAMENTE EN FUNCIONAMIENTO
    plugins: [ //Aqui van los plugins que vamos a utilizar
        [
            "module-resolver",
            {
                alias: {
                    "#root": "./server/src"
                }
            }
        ]
    ],
    presets: [ //son los presets para cambiar las cosas de los environments
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ]
    ]

}