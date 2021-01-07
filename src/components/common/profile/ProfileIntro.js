import React from "react";

const ProfileIntro = () =>{
    return (
        <React.Fragment>
        <section className="inner-header-title">
            <div className="container">
            </div>
        </section>
        <section className="detail-desc">
        <div className="container">
            <div className="ur-detail-wrap top-lay">

            <div className="ur-detail-box">
                    
                <div className="ur-thumb">
                    <img src="assets/img/can-2.png" className="img-responsive" alt="" />
                </div>
                <div className="ur-caption">
                    <h4 className="ur-title">Daniel Diwards</h4>
                    <p className="ur-location"><i className="ti-location-pin mrg-r-5"></i>232, New Sleewar, Canada</p>
                    <span className="ur-designation">Web Designer</span>
                    <div className="rateing">
                        <i className="fa fa-star filled"></i>
                        <i className="fa fa-star filled"></i>
                        <i className="fa fa-star filled"></i>
                        <i className="fa fa-star filled"></i>
                        <i className="fa fa-star"></i>
                    </div>
                </div>
            </div>
                
            <div className="ur-detail-btn">
                <a href="#" className="btn btn-warning mrg-bot-10 full-width"><i className="ti-thumb-up mrg-r-5"></i>Shortlist</a><br />
                <a href="#" className="btn btn-info full-width"><i className="ti-download mrg-r-5"></i>Download CV</a>
            </div>
        </div>
        </div>
    
    </section>
    </React.Fragment>
    )
} 

export default ProfileIntro