/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Panel} from 'components/ui/index';
import {
    setEditFolderViewVisible,
    setEditFolderData,
    deleteUserFolderData,
    sortValues,
    updateFolderName,
    createUserFolder,
    uploadFolders
} from '../../flow/action';
import {EditFolder} from '../component';


import {getTeamUsers, getSelectedTeamName} from '../../flow/reselect';

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
    }

    saveEditFolder = () => {
        const {setEditFolderViewVisible, userFolders, uploadFolders} = this.props;
        let canSave = true;
        if(_.uniqBy(userFolders, 'name').length !== userFolders.length){
            alert('same file name')
            return false
        }
        userFolders.map((item, key) => {
            if(item.name === ''){
                alert('empty file name exist')
                canSave = false;
                return true
            }
        })
        if(canSave){
            uploadFolders(()=>{setEditFolderViewVisible(false)});
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {isOtherDragging} = this.state;

        const {userFolders, editFolders, setEditFolderViewVisible, setEditFolderData, deleteUserFolderData, createUserFolder, ...others} = this.props;
        return (
            <EditFolder userFolders={userFolders}
                        editFolders={editFolders}
                        setEditFolderViewVisible={setEditFolderViewVisible}
                        setEditFolderData={setEditFolderData}
                        deleteUserFolderData={deleteUserFolderData}
                        createUserFolder={createUserFolder}
                        isOtherDragging={isOtherDragging}
                        formatMessage={formatMessage}
                        editFolderName={this.editFolderName}
                        moveCard={this.moveCard}
                        clearDragging={this.clearDragging}
                        setDragging={this.setDragging}
                        handleItemSelection={this.handleItemSelection}
                        saveEditFolder={this.saveEditFolder}
                        {...others}/>
        );
    }
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
    createUserFolder,
    uploadFolders
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateEditFolder);

