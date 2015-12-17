import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

@Radium
export default class Background extends Component {
    render() {

        return (
            <div>
                <div>
                    <h1>Project Description</h1>
                    <p>Yelp’s most ubiquitous feature is undoubtedly its reviews; within their open dataset alone, the provided 1.6 million reviews make up nearly half of the three gigabytes of data. However, another significant part of this open dataset are the five-hundred thousand tips that Yelp also makes available.

                        Yelp defines a tip as “a way to pass along some key information about a business -- such as the best time to go or your favorite dish -- without writing a full review about your experiences” . A tip may focus on things unrelated to a customer’s overall experience and highlight facts not quickly discernable from a review; for example, a user may leave a tip to inform users that a restaurant is open late and they prefer cash. However, these tips do not actually appear on Yelp’s website; instead, users can only view these tips on their mobile device, and are located at the very bottom of the mobile applications or the mobile version of their website. While the reviews outnumber tips in the dataset 3.2:1, this ratio is actually quite low; none of the authors were aware that tips even existed, and for the dataset to provide five-hundred thousand tips was something worth exploring further.

                        Our motivation for focusing on tips came from the lack of clarity or obvious benefit that tips provided in comparison to reviews; this was especially of interest when we noted that tips were not featured prominently in any particular way. How do tips affect businesses, if at all? Are there any discernable difference between the content of tips and the content of reviews? If there are seemingly no differences, should Yelp discontinue support for tips, or should they ultimately provide a different way to look at these tips? We aim to answer these questions throughout our paper by extracting a variety of topics and general sentiments found in reviews and texts, in order to ultimately compare the differences found.
                    </p>
                </div>
                <div>
                    <h1>Data</h1>
                    <p>The dataset used in our research was provided by Yelp for its Dataset Challenge, in which they provide roughly 2-3 gigabytes of JSON data for various facets of a business. Data was gathered by Yelp in ten cities in the US, Canada and Europe. In the JSON files, there are objects for 61,000 businesses, 1.6 million reviews, 366,000 users, check-ins, and 500,000 tips. The data begins for some business as early as 2004, and as recently as 2015. In our analysis, the three main datasets we used were reviews, business, and tips. A business consists of a variety of features, but our research focused mostly on the star rating and review count for a given business. From each tip and review, we gathered the “text” feature to run our sentiment and topic analysis, and joined on the “business_id” feature in order to correlate specific businesses with the tips or reviews left.
                    </p>
                </div>
                <div>
                    <h1>Results</h1>
                    <p>After running our topic and sentiment analysis, we feel as if we better understand the true value proposition of tips. Although Yelp’s definition of a tip is clear, through our analysis, we were able to begin to better understand how tips are used. Indeed, tips are generally used as explicit suggestions users leave for other users, whereas reviews are often less suggestion-oriented and more about menu items or experiences. Tips, too, tend to range from extremely objective or extremely subjective, but both reviews and tips are also generally more positive in their text. Important to note, however, is that tips generally do not seem to predict star ratings particularly well (or vice versa); this is likely due to the variety of tips that could be left (subjective/positive, objective/negative, etc.), whereas reviews generally are a more clear indicator of star ratings.

                        Although there are these similarities, we believe that the value in tips lies in the quick suggestion use-case and that Yelp should continue to support them. However, we also believe that to better take advantage of the information that tips have, Yelp should create more of a focus on tips on their mobile apps and website. Instead of having users scroll near the bottom of the screen to see tips, we believe that tips would benefit from moving them up above reviews (similar to where “review highlights” are located), in order to bring attention to the tips. For users that are particularly busy – e.g. business travelers who need to know how early to get to an airport they have never been to – giving them easier, more convenient access to tips would likely benefit them, possibly promoting more active use of the tip feature.
                    </p>
                </div>
                <div>
                    <h1>Team</h1>
                    <div style={STYLES.team}>
                        <div class="team">
                            <img style={STYLES.profile} src="images/marcus.jpg"/>
                            <div>Marcus Scott</div>
                            <div>
                                <a href="http://mmmscott.bitbucket.org/">Website</a>
                            </div>
                        </div>
                        <div class="team">
                            <img style={STYLES.profile} src="images/alex.jpg"/>
                            <div>Alex Ngo</div>
                            <div>
                                <a href="https://www.linkedin.com/in/alexhngo">LinkedIn</a>
                            </div>
                            <div>
                                <a href="https://github.com/NgoKnows">Github</a>
                            </div>
                        </div>
                        <div class="team">
                            <img style={STYLES.profile} src="images/rhea.jpg"/>
                            <div>Rhea Arora</div>
                            <div>
                                <a href="https://www.linkedin.com/in/rheaa7">LinkedIn</a>
                            </div>
                        </div>
                        <div class="team">
                            <img style={STYLES.profile} src="images/abbas.jpg"/>
                            <div>Abbas Tahirzadeh</div>
                            <div>
                                <a href="https://www.linkedin.com/in/abbastahirzadeh">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const STYLES = {
    team: {
        display: 'flex',
        justifyContent: 'space-around'
    },

  profile: {
      maxHeight: '300px',
      maxWidth: '240px'
  }
}
