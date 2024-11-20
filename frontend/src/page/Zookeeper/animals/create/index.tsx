import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Upload, Button, message, Row, Col, Space, Card, Divider,DatePicker,Select} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { CreateAnimal,GetSexs,GetBehaviorals,GetBiological,ListHabitat } from "../../../../services/https"; // นำเข้า service ที่สร้าง
import { SexsInterface }from "../../../../interface/ISex"
import { BehavioralInterface }from "../../../../interface/IBehavioral"
import { BiologicalInterface }from "../../../../interface/IBiological"
import { HabitatInterface }from "../../../../interface/IHabitat"

const CreateAnimalForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [sexs, setSexs] = useState<SexsInterface[]>([]);
  const [behaviorals, setBehaviorals] = useState<BehavioralInterface[]>([]);
  const [biologicals, setBiologicals] = useState<BiologicalInterface[]>([]);
  const [habitats, setHabitats] = useState<HabitatInterface[]>([]);

  const { Option } = Select;

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload a picture");
      return;
    }

    const formData = new FormData();
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
    formData.append("employeeID", "1");  // Set EmployeeID to 1
    formData.append("habitatID", values.habitatID);
    formData.append("picture", fileList[0].originFileObj);

    const response = await CreateAnimal(formData);

    if (response) {
      message.success("Animal created successfully!");
      form.resetFields();
      setFileList([]);
    } else {
      message.error("Failed to create animal.");
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

  const getSex = async () => {
    let res = await GetSexs();
    if (res) {
      setSexs(res);
    }
  };

  const getBiological = async () => {
    let res = await GetBiological();
    if (res) {
      setBiologicals(res);
    }
  };

  const getBehavioral = async () => {
    let res = await GetBehaviorals();
    if (res) {
      setBehaviorals(res);
    }
  };

  const getHabitat = async () => {
    let res = await ListHabitat();
    if (res) {
      setHabitats(res);
    }
  };

  useEffect(() => {
    getSex();
    getBiological();
    getBehavioral();
    getHabitat();
  }, []);

  return (
    <Card>
      <h2>Create Animal</h2>
      <Divider />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 9]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Upload Picture"
              name="picture"
              valuePropName="fileList"
              rules={[{
                required: true,
                message: "Please upload a picture",
                validator: () => {
                  return fileList.length > 0 ? Promise.resolve() : Promise.reject(new Error("Please upload a picture"));
                },
              }]}
            >
              <ImgCrop rotationSlider>
                <Upload
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    setFileList([file]);
                    return false; 
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

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the animal's name" }]}
            >
              <Input placeholder="Enter animal name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter animal description" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Weight"
              name="weight"
              rules={[{ required: true, message: "Please enter the animal's weight" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Enter animal weight" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Height"
              name="height"
              rules={[{ required: true, message: "Please enter the animal's height" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Enter animal height" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Birth Date"
              name="birthDay"
              rules={[{ required: true, message: "Please select the birth date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Birthplace"
              name="birthplace"
              rules={[{ required: true, message: "Please enter the birthplace" }]}
            >
              <Input placeholder="Enter animal birthplace" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Health Status"
              name="health"
              rules={[{ required: true, message: "Please enter the health status" }]}
            >
              <Input placeholder="Enter health status" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Note"
              name="note"
              rules={[{ required: true, message: "Please enter a note" }]}
            >
              <Input placeholder="Enter any additional notes" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Sex ID"
              name="sexID"
              rules={[{ required: true, message: "Please enter the sex ID" }]}
            >
              <Select allowClear>
                  {sexs.map((item) => (
                    <Option value={item.ID} key={item.Sex}>
                      {item.Sex}
                    </Option>
                  ))}
                </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Biological ID"
              name="biologicalID"
              rules={[{ required: true, message: "Please enter the biological ID" }]}
            >
              <Select allowClear>
                  {biologicals.map((item) => (
                    <Option value={item.ID} key={item.Biological}>
                      {item.Biological}
                    </Option>
                  ))}
                </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Behavioral ID"
              name="behavioralID"
              rules={[{ required: true, message: "Please enter the behavioral ID" }]}
            >
              <Select allowClear>
                  {behaviorals.map((item) => (
                    <Option value={item.ID} key={item.Behavioral}>
                      {item.Behavioral}
                    </Option>
                  ))}
                </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="Habitat ID"
              name="habitatID"
              rules={[{ required: true, message: "Please enter the habitat ID" }]}
            >
              <Select allowClear>
                  {habitats.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Col>
            <Space>
              <Button htmlType="button">Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create Animal
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CreateAnimalForm;
