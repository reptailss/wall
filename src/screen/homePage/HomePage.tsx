
import {Col, Row} from "react-bootstrap";
import Wall from "../../containers/wall";
import InfoProfile from "../../containers/profile/infoProfile/InfoProfile";
import UserAvatar from "../../containers/user/userAvatar/UserAvatar";
import ChangeUserAvatar from "../../containers/user/changeUserAvatar/ChangeUserAvatar";
import {useAppSelector} from "../../hooks/redux";

const HomePage = () => {
    const {id} = useAppSelector(state => state.user);
    const profile = useAppSelector(state => state.user.profile);

    return (
        <Row>
            <Col xl={4}>
                <UserAvatar/>
                <ChangeUserAvatar/>
            </Col>
            <Col xl={8}>
                <InfoProfile profile={profile}/>
                <Wall id={id}/>
            </Col>

        </Row>
    );
};


export default HomePage;