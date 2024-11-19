import React, { useState } from "react";
import { Form, Input, DatePicker, Upload, Button, message, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateReport } from "../../../../services/https"; // Import service function
import moment from "moment";

const { TextArea } = Input;

const CreateReportForm: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append all form fields to FormData
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("reportDate", values.reportDate.format("YYYY-MM-DD"));
    formData.append("status", values.status);
    formData.append("statusVet", values.statusVet);
    formData.append("animalID", values.animalID);
    formData.append("employeeID", values.employeeID);

    if (file) {
      formData.append("picture", file);
    } else {
      message.error("Please upload a picture");
      return;
    }

    // Call API to create report
    const response = await CreateReport(formData);

    if (response) {
      message.success("Report created successfully!");
      form.resetFields();
      setFile(null);
    } else {
      message.error("Failed to create report.");
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
      <h2>Create Report</h2>
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter report title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <TextArea rows={4} placeholder="Enter report description" />
        </Form.Item>

        <Form.Item
          label="Report Date"
          name="reportDate"
          rules={[{ required: true, message: "Please select the report date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter status" }]}
        >
          <Input placeholder="Enter status" />
        </Form.Item>

        <Form.Item
          label="Status of Veterinarian"
          name="statusVet"
          rules={[{ required: true, message: "Please enter status of veterinarian" }]}
        >
          <Input placeholder="Enter vet status" />
        </Form.Item>

        <Form.Item
          label="Animal ID"
          name="animalID"
          rules={[{ required: true, message: "Please enter Animal ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter Animal ID" />
        </Form.Item>

        <Form.Item
          label="Employee ID"
          name="employeeID"
          rules={[{ required: true, message: "Please enter Employee ID" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter Employee ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateReportForm;
