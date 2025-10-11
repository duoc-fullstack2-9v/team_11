import ProductoHome from "../components/ProductoHome";


function Productos() {
    return (
    <>
            <main>
                <h2 className="titulo-principal">Compra los mejores productos al mejor precio!</h2>
                <div className="contenedor-producto">
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/street x tekken.webp" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Street Figther vs Tekken</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/elden-ring-portada.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Elden Ring</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/skyrim.webp" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Skyrim </h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/redDead.avif" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Red dead redemption ll</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/silenciogill.png" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Sillent hill F</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/resident-evil-4-hd-proyect-generacionxbox.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Resident evil 4</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/resident7.avif" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Resident evil 7</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/BioShock_cover.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Bioshock </h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/devilmycry.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Devil my cry 5</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                    <div className="producto">
                        <img className="producto-imagen" src="./imgs/lamamu.jpg" alt=""/>
                        <div className="producto-detalles">
                            <h3 className="producto-titulo">Bayonetta'</h3>
                            <p className="producto-precio">$29.990</p>
                            <button className="producto-agregar">Agregar</button>
                        </div>
                    </div>
                </div>
            </main>
    </>
    )
}

export default Productos;