import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const BookDetails = () => {

    const {id} = useParams();
    const [bookId, setBookId] = useState(null);

    console.log(id);


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAwktWtvmX4Vq55gqVsJL5T1aU9ZaQzzCg`)
            .then(res => res.json())
            .then(data => setBookId(data))
    }, [id]);


    if(bookId == null) return 'Loading...'
    let description = bookId.volumeInfo.description;
    return (
        <div>
            <p>{description}</p>
        </div>
    )
}


export default BookDetails;