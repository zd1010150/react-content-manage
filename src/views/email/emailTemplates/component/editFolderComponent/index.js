/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from "react";
import {intlShape, injectIntl} from "react-intl";
import {Row, Col, Button, Icon, Radio, Input} from "antd";
import {Panel} from "components/ui/index";
import classNames from "classnames/bind";
import Folder from "../folder";
import styles from "../../emailTemplates.less";
import {ActionButtonGroup} from "../common";
const cx = classNames.bind(styles);

const EditFolder = ({
                        userFolders,
                        editFolders,
                        setEditFolderViewVisible,
                        setEditFolderData,
                        deleteEditFolderData,
                        createEditFolder,
                        isOtherDragging,
                        formatMessage,
                        editFolderName,
                        moveCard,
                        clearDragging,
                        setDragging,
                        handleItemSelection,
                        saveEditFolder,
                        cancel,
                        tempId,
                        setTempId,
                        ...others
                    }) => {
    const actionsRight = (
        <div>
            <Button
                className="btn-ellipse email-theme-btn"
                size="small"
                onClick={() => {
                    createEditFolder({name: "", id: tempId});
                    setTempId()
                }}
            >
                <Icon type="plus"/>
                {formatMessage({id: "page.emailTemplates.newFolder"})}
            </Button>
        </div>
    );
    return (
        <Panel
            panelTitle={formatMessage({id: "page.emailTemplates.editFolderTitle"})}
            panelClasses="email-theme-panel"
            actionsRight={actionsRight}
        >
            <Row onMouseDown={handleItemSelection} className={cx("folders")}>
                {editFolders.map((item, key) =>
                    <Col
                        key={key}
                        data-index={key}
                        data-id={item.id}
                        className="pl-lg mb-md gutter-row field-label"
                        span={6}
                    >
                        <Folder
                            key={item.id}
                            item={item}
                            deleteEditFolderData={deleteEditFolderData}
                            setEditFolderData={setEditFolderData}
                            editFolderName={editFolderName}
                            id={item.id}
                            index={key}
                            moveCard={moveCard}
                            isSelected={item.selected}
                            isOtherDragging={isOtherDragging}
                            clearDragging={clearDragging}
                            setDragging={setDragging}
                            {...others}
                        />
                    </Col>
                )}
            </Row>
            <ActionButtonGroup
                saveEditFolder={saveEditFolder}
                cancel={cancel}
                setEditFolderViewVisible={setEditFolderViewVisible}
                formatMessage={formatMessage}
            />
        </Panel>
    );
};

export default EditFolder;
