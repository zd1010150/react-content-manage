/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon, Radio, Input} from 'antd';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import Folder from '../component/folder';
import styles from '../emailTemplates.less';
import {
    setEditFolderViewVisible,
    setEditFolderData,
    deleteUserFolderData,
    sortValues,
    updateFolderName,
    createUserFolder
} from '../flow/action';


import {getTeamUsers, getSelectedTeamName} from '../flow/reselect';
const cx = classNames.bind(styles);

// const FolderInput = ({item, editFolders, setEditFolderData, deleteUserFolderData})=>{
//     let canEdit = false;
//     editFolders.forEach((folder)=>{
//         if(folder.id === item.id){
//             canEdit = true;
//         }
//     })
//    return <Col className="pl-lg gutter-row field-label" span={6}>
//        <div onClick={()=>{deleteUserFolderData(item.id)}}>
//            <Icon className={cx(['folder-icon', 'folder-move'])} type="folder" /><span className="pl-sm"><Icon type="delete"/></span>
//        </div>
//        <Input size="small" disabled={!canEdit} addonAfter={!canEdit && <Icon onClick={() => {setEditFolderData(item)}} type="edit" />} defaultValue={item.name} />
//    </Col>
// }

const ActionButtonGroup = ({setEditFolderViewVisible, formatMessage}) => {
    return <div className="pt-md pl-md pb-md">
        <Button className="email-theme-btn mr-md" onClick={() => {
            setEditFolderViewVisible(false)
        }}><Icon type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
        <Button onClick={() => {
            setEditFolderViewVisible(false)
        }}><Icon type="close"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
    </div>
}

class EmailTemplateEditFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.userFolders,
            selectIndex: -1,
            isOtherDragging: false,
            tempId: -1
        };
    }

    componentWillReceiveProps(nextProps) {
        const {cards} = this.state;
        if (nextProps.userFolders.length === this.props.userFolders.length + 1) {
            const last = nextProps.userFolders[nextProps.userFolders.length - 1];
            return this.setState({
                cards: [...cards, last],
            });
        }
        return this.setState({
            cards: [...nextProps.userFolders],
        });
    }

    setSelectedCards = (index) => {
        const {cards} = this.state;
        const selectedCards = cards.map((card, i) => {
            card.selected = i === Number(index);
            return card;
        });
        const {onSelect} = this.props;
        if (onSelect && typeof onSelect === 'function') {
            onSelect(selectedCards.filter(card => card.selected));
        }
        return selectedCards;
    }

    handleItemSelection = e => {
        const {index} = e.target.dataset;

        if (!e.shiftKey) {
            return this.setState({
                cards: this.setSelectedCards(index),
                selectIndex: index
            });
        }
    }

    setDragging = () => {
        const {selectIndex} = this.state;
        this.setState({
            isOtherDragging: true,
            cards: this.setSelectedCards(selectIndex),
        });
    }

    onDrop = sortedArray => {
        // console.log('dropped ----- current order is:');
        // console.log(sortedArray);
        // const ids = sortedArray.map(elem => elem.id);
        this.props.sortValues(sortedArray);
    }

    clearDragging = () => {
        this.onDrop(this.state.cards);
        this.setState({isOtherDragging: false});
    }

    // Swap algorithm
    // According to how the drag function is worked (in other words, when moveCard is being called), we only swap with one adjacent card every time,
    swapCards = (cards, start, newStart) => {
        const cardsCopy = _.cloneDeep(cards);
        const dragCards = cardsCopy.splice(start, 1);
        // Insert dragged card into new positions
        cardsCopy.splice(newStart, 0, dragCards[0]);
        return cardsCopy;
    }

    moveCard = (dragIndex, hoverIndex) => {
        const {selectIndex, cards} = this.state;
        // Don't replace items with other selected items
        if (hoverIndex === selectIndex) {
            return;
        }

        const newStartIndex = hoverIndex;
        const newCards = this.swapCards(cards, selectIndex, newStartIndex);

        this.setState({
            selectIndex: newStartIndex,
            cards: newCards,
            isOtherDragging: true,
        });
    }

    editFolderName = (e, item) => {
        this.props.updateFolderName({id: item.id, name: e.target.value})
        // this.state.cards.map((card)=>{
        //     if(card.id === item.id){
        //         card.userName = e.target.value
        //     }
        // })
        // this.setState({ userName: e.target.value });
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {isOtherDragging} = this.state;

        const {userFolders, editFolders, setEditFolderViewVisible, setEditFolderData, deleteUserFolderData, createUserFolder, ...others} = this.props;
        const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {createUserFolder({"name": "???", id: this.state.tempId}); this.setState((prevState)=>{prevState.tempId-=1})
        }}><Icon type="plus"/>{ formatMessage({id: 'page.emailTemplates.newFolder'}) }</Button></div>;
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.editFolderTitle'})}
                   panelClasses="email-theme-panel"
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('email-panel-content')}`} actionsRight={actionsRight}>
                <Row onMouseDown={this.handleItemSelection} className={cx('folders')}>
                    {userFolders.map((item, key) =>
                        <Col
                            key={key}
                            data-index={key}
                            data-id={item.id}
                            className="pl-lg mb-md gutter-row field-label"
                            span={6}>
                            <Folder
                                key={item.id}
                                item={item}
                                deleteUserFolderData={deleteUserFolderData}
                                setEditFolderData={setEditFolderData}

                                editFolderName={this.editFolderName}
                                id={item.id}
                                index={key}
                                moveCard={this.moveCard}
                                isSelected={item.selected}
                                isOtherDragging={isOtherDragging}
                                clearDragging={this.clearDragging}
                                setDragging={this.setDragging}
                                {...others}
                            />
                        </Col>
                    )}
                </Row>
                <ActionButtonGroup setEditFolderViewVisible={setEditFolderViewVisible} formatMessage={formatMessage}/>
            </Panel>
        );
    }
}

{/*
 <FolderInput
 key={item.id}
 item={item}
 editFolders={editFolders}
 setEditFolderData={setEditFolderData}
 deleteUserFolderData={deleteUserFolderData}/>
 */
}


EmailTemplateEditFolder.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({global, setup}) => {
    const {emailTemplates} = setup;
    return {
        teamUsers: getTeamUsers({emailTemplates}),
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        editFolders: emailTemplates.editFolders,
        userFolders: emailTemplates.userFolders
    };
};

const mapDispatchToProps = {
    setEditFolderViewVisible,
    setEditFolderData,
    deleteUserFolderData,
    sortValues,
    updateFolderName,
    createUserFolder
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateEditFolder));

