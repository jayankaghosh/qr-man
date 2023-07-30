import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {CircularProgress} from "@mui/material";

const refreshContent = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <CircularProgress />
        </div>
    );
}

const Items = ({ renderer: Item, items, incrementPage, hasMorePages, refreshList }) => {
    const { t } = useTranslation('common');
    return (
        <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={incrementPage}
            hasMore={hasMorePages}
            loader={null}
            endMessage={null}
            // below props only if you need pull down functionality
            refreshFunction={refreshList}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={refreshContent()}
            releaseToRefreshContent={refreshContent()}
        >
            { items.map((item, index) => <Item key={index} data={item} refreshList={refreshList}  />) }
        </InfiniteScroll>
    )
}

const renderList = (items, incrementPage, hasMorePages, refreshList, NoItems, itemRenderer) => {
    if (!items) {
        return null;
    } else if (items.length) {
        return (
            <Items
                renderer={itemRenderer}
                items={items}
                incrementPage={incrementPage}
                hasMorePages={hasMorePages}
                refreshList={refreshList}
            />
        );
    } else {
        return <NoItems />
    }
}

const ItemList = ({ fetchItems, noItemsFoundComponent, itemRenderer }) => {
    const pageSize = 10;
    const [items, setItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [fetchItemsState, setFetchItemsState] = useState(false);
    const incrementPage = () => setCurrentPage(currentPage+1);

    const refreshList = async () => {
        setItems(null);
        setHasMorePages(true);
        setCurrentPage(1);
        setFetchItemsState(true);
    }
    useEffect(() => {
        setFetchItemsState(true);
    }, [currentPage]);

    useEffect(() => {
        if (fetchItemsState === true) {
            setFetchItemsState(false);
            fetchItems(items, setItems, setHasMorePages, currentPage, pageSize);
        }
    }, [fetchItemsState]);
    return (
        <div className={'ItemList'}>
            { renderList(items, incrementPage, hasMorePages, refreshList, noItemsFoundComponent, itemRenderer) }
        </div>
    )
}

export default ItemList;