import React from 'react';
import SearchInput from "../searchInput/SearchInput";
import {Col, Row} from "react-bootstrap";
import Sort from "../../sort/Sort";

import styles from './styles.module.scss'
import SearchList from "../searchList/SearchList";
import SearchType from "../searchType/SearchType";

const SearchFull = () => {


    return (
        <div className={styles.root}>

            <Row>
                <Col xl={12}>
                    <SearchType/>
                </Col>
                <Col xl={4}>
                    <Sort/>
                </Col>

                <Col xl={8}>
                    <div className={styles.search}>
                        <SearchInput/>
                        <SearchList/>
                    </div>

                </Col>
            </Row>


        </div>
    );
};

export default SearchFull;