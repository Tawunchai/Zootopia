import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  message,
  InputNumber,
  Card,
  Divider,
  Row,
  Col,
  Space,
} from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { CreateReport } from "../../../../services/https"; // Import service function

const { TextArea } = Input;

const CreateReportForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload a picture");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("reportDate", values.reportDate.format("YYYY-MM-DD"));
    formData.append("status", values.status);
    formData.append("statusVet", values.statusVet);
    formData.append("animalID", values.animalID);
    formData.append("employeeID", "1"); // Set employeeID to 1
    formData.append("picture", fileList[0].originFileObj);

    const response = await CreateReport(formData);

    if (response) {
      message.success("Report created successfully!");
      form.resetFields();
      setFileList([]);
    } else {
      message.error("Failed to create report.");
    }
  };

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width: 100%;" />`);
  };

  return (
    <Card>
      <h2>Create Report</h2>
      <Divider />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Upload Picture"
              name="picture"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: "Please upload a picture",
                  validator: () => {
                    return fileList.length > 0
                      ? Promise.resolve()
                      : Promise.reject(new Error("Please upload a picture"));
                  },
                },
              ]}
            >
              <ImgCrop rotationSlider>
                <Upload
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    setFileList([file]);
                    return false; // Prevent auto-upload
                  }}
                  maxCount={1}
                  listType="picture-card"
                >
                  {fileList.length < 1 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter report title" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <TextArea rows={4} placeholder="Enter report description" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Report Date"
              name="reportDate"
              rules={[{ required: true, message: "Please select the report date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please enter status" }]}
            >
              <Input placeholder="Enter status" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Status of Veterinarian"
              name="statusVet"
              rules={[{ required: true, message: "Please enter vet status" }]}
            >
              <Input placeholder="Enter vet status" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Animal ID"
              name="animalID"
              rules={[{ required: true, message: "Please enter Animal ID" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Enter Animal ID" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Col>
            <Space>
              <Button htmlType="button">Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create Report
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CreateReportForm;
