import React, { useState } from "react";
import { Form, Input, InputNumber, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateAnimal } from "../../../../services/https"; 
import moment from "moment";

const { TextArea } = Input;

const CreateAnimalForm: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append all form fields to FormData
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("weight", values.weight);
    formData.append("height", values.height);
    formData.append("birthDay", values.birthDay.format("YYYY-MM-DD"));
    formData.append("birthplace", values.birthplace);
    formData.append("health", values.health);
    formData.append("note", values.note);
    formData.append("sexID", values.sexID);
    formData.append("biologicalID", values.biologicalID);
    formData.append("behavioralID", values.behavioralID);
    formData.append("employeeID", values.employeeID);
    formData.append("habitatID", values.habitatID);

    if (file) {
      formData.append("picture", file);
    } else {
      message.error("Please upload a picture");
      return;
    }

    // Call API to create animal
    const response = await CreateAnimal(formData);

    if (response) {
      message.success("Animal created successfully!");
      form.resetFields();
      setFile(null);
    } else {
      message.error("Failed to create animal.");
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
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
      <h2>Create Animal</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Upload Picture"
          name="picture"
          rules={[{ required: true, message: "Please upload a picture" }]}
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
          rules={[{ required: true, message: "Please enter the animal's name" }]}
        >
          <Input placeholder="Enter animal name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <TextArea rows={4} placeholder="Enter animal description" />
        </Form.Item>

        <Form.Item
          label="Weight"
          name="weight"
          rules={[{ required: true, message: "Please enter the animal's weight" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter animal weight" />
        </Form.Item>

        <Form.Item
          label="Height"
          name="height"
          rules={[{ required: true, message: "Please enter the animal's height" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter animal height" />
        </Form.Item>

        <Form.Item
          label="Birth Date"
          name="birthDay"
          rules={[{ required: true, message: "Please select the birth date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Birthplace"
          name="birthplace"
          rules={[{ required: true, message: "Please enter the birthplace" }]}
        >
          <Input placeholder="Enter animal birthplace" />
        </Form.Item>

        <Form.Item
          label="Health Status"
          name="health"
          rules={[{ required: true, message: "Please enter the health status" }]}
        >
          <Input placeholder="Enter health status" />
        </Form.Item>

        <Form.Item
          label="Note"
          name="note"
          rules={[{ required: true, message: "Please enter a note" }]}
        >
          <Input placeholder="Enter any additional notes" />
        </Form.Item>

        <Form.Item
          label="Sex ID"
          name="sexID"
          rules={[{ required: true, message: "Please enter the sex ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter sex ID" />
        </Form.Item>

        <Form.Item
          label="Biological ID"
          name="biologicalID"
          rules={[{ required: true, message: "Please enter the biological ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter biological ID" />
        </Form.Item>

        <Form.Item
          label="Behavioral ID"
          name="behavioralID"
          rules={[{ required: true, message: "Please enter the behavioral ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter behavioral ID" />
        </Form.Item>

        <Form.Item
          label="Employee ID"
          name="employeeID"
          rules={[{ required: true, message: "Please enter the employee ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter employee ID" />
        </Form.Item>

        <Form.Item
          label="Habitat ID"
          name="habitatID"
          rules={[{ required: true, message: "Please enter the habitat ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter habitat ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Animal
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAnimalForm;
