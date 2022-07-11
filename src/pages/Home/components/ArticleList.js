import { Avatar, Button, Skeleton, Tooltip, List, Pagination } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

export default ({loading, data, defaultCurrent, pageSizeOptions, onChangePagination}) =>{

    const openUrl = (url) =>{
        window.open(url, "_blank")
    }
    return(
        <div>
            {data.articles && data.articles.length && data.articles.length > 0 ?
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={data.articles}
                    footer={<Pagination 
                                style={{textAlign: 'center'}} 
                                onChange={onChangePagination} 
                                total={data.total} 
                                defaultCurrent={defaultCurrent}
                                pageSizeOptions={[pageSizeOptions]}
                                responsive={true}
                                />}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                        <Tooltip 
                                            title="Abrir artículo">
                                                <Button 
                                                    type="default" 
                                                    onClick={()=>{openUrl(item.url)}} 
                                                    shape="round" 
                                                    icon={<LinkOutlined 
                                                            style={{ fontSize: '16px', color: '#08c', cursor:'pointer' }} 
                                                        />
                                                    } 
                                                />
                                        </Tooltip>
                                    ]}
                        >
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={<Avatar size="medium" src={item.imageUrl} />}
                                description={item.title}
                            />
                        </Skeleton>
                        </List.Item>
                    )}
                />
            : 
                null
            }
       </div>
    );
}