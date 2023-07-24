import "./filter.css"

export const Filter = () => {

    const rangeInput = document.querySelectorAll(".input-range input"),
        priceInput = document.querySelectorAll(".input-price input"),
        progress = document.querySelectorAll(".slider .progress"),
        priceGap = 1000

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value)

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "min-range") {
                    rangeInput[0].value = maxVal - priceGap
                } else {
                    rangeInput[1].value = maxVal + priceGap
                }
            } else {
                priceInput[0].value = minVal
                priceInput[1].value = maxVal
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
            }
        })
    })

    // priceInput.forEach((input) => {
    //     input.addEventListener("input", (e) => {
    //         let minVal = parseInt(priceInput[0].value),
    //             maxVal = parseInt(priceInput[1].value)

    //         if ((maxVal - minVal >= priceGap) && maxVal <= 10000) {
    //             if (e.target.className === "min") {
    //                 rangeInput[0].value = maxVal - priceGap
    //                 progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
    //             } else {
    //                 rangeInput[1].value = maxVal + priceGap
    //                 progress.style.right = (maxVal / rangeInput[1].max) * 100 + "%"
    //             }
    //         }
    //     })
    // })
    return (
        <div className="filter-container">
            <span>Цена</span>
            <div className="input-price">
                <div className="field">
                    <span>От</span>
                    <input type="number" className="min" value={2500} />
                </div>
                <div className="separator">-</div>
                <div className="field">
                    <span>До</span>
                    <input type="number" className="max" value={7500} />
                </div>
            </div>
            <div className="slider">
                <div className="progress"></div>
            </div>
            <div className="input-range">
                <input type="range" className="min-range" min={0} max={10000} value={2500} />
                <input type="range" className="max-range" min={0} max={10000} value={7500} />

            </div>
        </div>
    )
}

