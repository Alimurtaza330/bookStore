import bookcover from "../Pics/4735.jpg"

const Cards = ({ item }) => {
    return (
        <>
            <div>
                <div className="card bg-base-100 md:w-80 w-full hover:scale-95 duration-200 shadow-xl mt-3">
                    <figure>
                    <img
                        src={bookcover}
                    />
                    </figure>
                    <div className="card-body ">
                        <h2 className="card-title">
                            {item.name}
                            <div className="badge badge-secondary">{item.category}</div>
                        </h2>
                        <p>{item.title}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">${item.price}</div>
                            <div className="badge badge-outline">Buy Now</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cards
