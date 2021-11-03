const cardClickHandler = async (event) =>{
    event.preventDefault();
    // const image_url = event.target
    const id = (event.target.id)
    console.log(id)
    
    //    const response =  await fetch('/api/cards/' +id, {
    //         method: 'GET',

    //     });
    //     console.log(response)
        // if (response.ok) {
        //    //put request update quantity here
        // }else {
            await fetch('/api/cards/', {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: { 'Content-Type': 'application/json' },
    
        });

        // if (response.ok) {
        //     response.status(200).json('Card added to collection')
        // } else {
        //     response.status(500).json(
        // }
    }



document
    .querySelector('#card-field')
    .addEventListener('click', cardClickHandler)

    // module.exports = cardClickHandler