import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { CreateAnimal } from '../../../../services/https'; // Import your API function
import moment from 'moment'; // Import moment for date manipulation

const { Option } = Select;

// Define the interface for the form values
interface AnimalFormValues {
  Name: string;
  Description: string;
  BirthDay: moment.Moment;
  GenderID: number;
  BehavioralID: number;
  CategoryID: number;
}

const AnimalForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: AnimalFormValues) => {
    setLoading(true);
  
    // Format the values correctly (e.g., birthday to string)
    const data = {
      ...values,
      BirthDay: values.BirthDay.format('YYYY-MM-DDTHH:mm:ssZ'), // Format the date with time and timezone
    };
  
    console.log(data); // ดูค่าที่จะส่งไปยัง API
  
    // Call the API
    const result = await CreateAnimal(data);
    if (result) {
      message.success('Animal created successfully!');
      form.resetFields(); // Reset the form on success
    } else {
      message.error('Failed to create animal.');
    }
  
    setLoading(false);
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ GenderID: '', BehavioralID: '', CategoryID: '' }}
    >
      <Form.Item
        label={<span style={{ color: 'white' }}>Name</span>}
        name="Name"
        rules={[{ required: true, message: 'Please input the animal name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'white' }}>Description</span>}
        name="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
       label={<span style={{ color: 'white' }}>BirthDay</span>}
        name="BirthDay"
        rules={[{ required: true, message: 'Please select the birth date!' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
     label={<span style={{ color: 'white' }}>Gender</span>}
        name="GenderID"
        rules={[{ required: true, message: 'Please select the gender!' }]}
      >
        <Select placeholder="Select gender">
          <Option value={1}>Male</Option>
          <Option value={2}>Female</Option>
        </Select>
      </Form.Item>

      <Form.Item
      label={<span style={{ color: 'white' }}>Behavioral</span>}
        name="BehavioralID"
        rules={[{ required: true, message: 'Please select the behavioral!' }]}
      >
        <Select placeholder="Select behavioral type">
          <Option value={1}>Aggressive</Option>
          <Option value={2}>Calm</Option>
          {/* Add other behavioral types as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'white' }}>Category</span>}
        name="CategoryID"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
        <Select placeholder="Select category">
          <Option value={1}>Mammal</Option>
          <Option value={2}>Bird</Option>
          <Option value={3}>Reptile</Option>
          {/* Add other categories as needed */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Animal
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnimalForm;
