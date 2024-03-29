import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/SpinnerIcon";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading || profiles === null ? (
        <Spinner />
      ) : (
        <div className="profiles-grid">
          {/* <h1 className='large text-primary'>Ideators</h1> */}
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Our Ideators
          </p>
          <div className="profiles">
            <div className="flex">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found ...</h4>
              )}
            </div>

            <hr />
            <p>show more</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
