import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CreateHabitat } from '../../../../services/https';  // นำเข้า service ที่สร้าง

const CreateHabitatForm: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append form data
    formData.append('name', values.name);
    formData.append('size', values.size);
    formData.append('capacity', values.capacity);
    formData.append('zoneID', values.zoneID);
    
    if (file) {
      formData.append('picture', file);
    } else {
      message.error('Please upload a picture');
      return;
    }

    // Call API to create habitat
    const response = await CreateHabitat(formData);

    if (response) {
      message.success('Habitat created successfully!');
      form.resetFields();
      setFile(null);
    } else {
      message.error('Failed to create habitat.');
    }
  };

  const handleFileChange = (info: any) => {
    const fileList = info.fileList;
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
      <h2>Create Habitat</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Upload Picture"
          name="picture"
          rules={[{ required: true, message: 'Please upload a picture' }]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the habitat name' }]}
        >
          <Input placeholder="Enter habitat name" />
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: 'Please enter the habitat size' }]}
        >
          <Input placeholder="Enter habitat size" />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: 'Please enter the capacity' }]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter capacity" />
        </Form.Item>

        <Form.Item
          label="Zone ID"
          name="zoneID"
          rules={[{ required: true, message: 'Please enter Zone ID' }]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter Zone ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Habitat
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateHabitatForm;
