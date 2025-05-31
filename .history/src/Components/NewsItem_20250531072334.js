import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, date, author, source} = props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
        </span>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <p class="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
            </div>
            </div>
        </div>
    )
}

export default NewsItem;
