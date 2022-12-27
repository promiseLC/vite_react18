import IsShowComponent from '@/functionComponents/authComponents/isShow/index';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { Space, Table, Tag, Button,Form } from 'antd';
import CustomSelect from '@/component/customSelect/index';
import { useEffect, useReducer, useState, useRef, StyleHTMLAttributes } from 'react';


const { homeIndexModule ,homeIndex} = styles;

interface IDate {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  id?: number;
}

const data: IDate[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    id:1,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const {Item,useForm} = Form;



const constant = ['1'];

const FunctionComponent = () => {


  

  const [depsArray, setDepsArray] = useState<any[]>(['2']);
  const [depsObject, setDepsObject] = useState<any>({});

  const [current, forceUpdate] = useState<number>(0);

  const DivRef = useRef<HTMLDivElement>(null);


  const [form] = useForm();




  useEffect(() => {
    if (DivRef.current) {
      DivRef.current.style.setProperty('--font-size', '30px');
    }
  },[])

  useEffect(() => {
      console.log('常量');
  }, [constant])
  
  useEffect(() => {
    console.log('depsArray');
  }, [depsArray])

  useEffect(() => {
    console.log('depsObject');
  },[depsObject])

  useEffect(() => {
    console.log('[]');
  }, [[]])
  
  useEffect(() => {
    console.log('{}');
  }, [{}])

  const columns: ColumnsType<IDate> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags ,id}) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },{
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <IsShowComponent authStr='newCase2' replace='--' >
        <Space size="middle">
          <a>Invite {record.id||0}</a>
          <a>Delete</a>
        </Space>
        </IsShowComponent>
      ),
    },
  ];

  return (
    <div className={homeIndex} >
      <div  className={homeIndexModule} ref={DivRef} style={{}}  >css module 专用</div>
      <div className={styles.button} >

        <div>deps:{ depsArray}</div>
        <div>current:{ current}</div>
        
        <Button type='primary' onClick={()=>{forceUpdate(i=>i+1)}} >
           刷新  
        </Button>
    
        <IsShowComponent onClick={() => {setDepsArray(val=>val)}} authStr='open'>
        <Button type='primary'>
        {`setDepsValue((c)=>c)`}
          </Button>
        
        </IsShowComponent>
        <Button type='primary' onClick={()=>{setDepsArray(['2'])}} >
        {`setDepsValue(['2'])`}
        </Button>

        
        <Button type='primary' onClick={() => { setDepsObject({})}} >
        {`setDepsValue({})`}
        </Button>

        <Button type='primary' onClick={() => { setDepsObject((c:any)=>c)}} >
        {`setDepsObject((c)=>c)`}
        </Button>
      </div>

      <div className={styles.table} >
      <Table columns={columns} dataSource={data} />
      </div>

      <Form form={form} initialValues={{select:'10-24'}} onFinish={(v) => {
        console.log(v);
      }}  > 
        <Item name='select' > 
        <CustomSelect total={30} selected='1-10' ></CustomSelect>
     </Item>
      </Form>

      <Button onClick={() => {
        form.submit();
    }} >提交</Button>
    </div>
  );
};

export default FunctionComponent;
