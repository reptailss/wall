import {Col, Row} from "react-bootstrap";
import Wall from "../../containers/wall";
import InfoProfile from "../../containers/profile/infoProfile/InfoProfile";

import {useAppSelector} from "../../hooks/redux";
import ChangeAvatarBtn from "../../containers/avatar/changeAvatarBtn/ChangeAvatarBtn";
import UserAvatar from "../../containers/avatar/userAvatar/UserAvatar";
import FriendsSidebar from "../../containers/friends/friendsSidebar/FriendsSidebar";

const HomePage = () => {
    const {id} = useAppSelector(state => state.user);
    const {profile,loadingProfile} = useAppSelector(state => state.user);
    const{currentAvatar} = profile;

    return (
        <Row>
            <Col xl={4}>
                <UserAvatar
                    currentAvatar={currentAvatar}
                />
                <ChangeAvatarBtn
                text={'змінити'}
                />
                <FriendsSidebar
                    myPage
                    userId={id}/>
            </Col>
            <Col xl={8}>
                <InfoProfile
                    loadingProfile={loadingProfile}
                    idUser={id}
                    profile={profile}/>
                <Wall id={id}/>
            </Col>

        </Row>
    );
};


export default HomePage;