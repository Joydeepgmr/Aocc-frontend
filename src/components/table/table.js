import { Empty, Form, Input, InputNumber, Select, Table, TimePicker, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './table.scss';
import dayjs from 'dayjs';

const TableComponent = ({
	columns,
	data = [],
	loading = false,
	onChange = () => { },
	tableTitle = '',
	emptyText = 'No data available',
	fetchData,
	pagination,
	handleEdit,
	isColored,
	...rest
}) => {
	const handleTableChange = (pagination, filters, sorter) => {
		const sortField = sorter?.field;
		const sortOrder = sorter?.order;

		onChange({
			sortField,
			sortOrder,
			pagination,
			...filters,
		});
	};
	const hasMoreData = pagination?.isMore ?? pagination;

	const EditableContext = React.createContext(null);
	const EditableRow = ({ index, ...props }) => {
		const [form] = Form.useForm();
		return (
			<Form form={form} component={false}>
				<EditableContext.Provider value={form}>
					<tr {...props} />
				</EditableContext.Provider>
			</Form>
		);
	};
	const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
		const [editing, setEditing] = useState(false);
		const [multiSelectValues, setMultiSelectValues] = useState([]);
		const inputRef = useRef();
		const form = useContext(EditableContext);
		useEffect(() => {
			if (editing) {
				inputRef.current?.focus();
			}
		}, [editing]);
		const toggleEdit = () => {
			if (editable.type === 'multi-select') {
				if (editing) {
					setEditing(false);
					save();
				}
			}
			setEditing(!editing);
			if (editable.type === 'multi-select') {
				const selectedValues = record[dataIndex].reduce((acc, data) => [...acc, data?.[editable.selectedValue]], []);
				setMultiSelectValues(selectedValues);
				form.setFieldsValue({
					[editable.selectedValue]: selectedValues,
				});
			} else {
				form.setFieldsValue({
					[dataIndex]: record[dataIndex],
				});
			}
		};
		const handleTimeChange = (name, value) => {
			if (value) {
				toggleEdit();
				handleSave({
					...record,
					values: { [name]: value },
				});
			}
		};
		const save = async () => {
			try {
				const values = await form.validateFields();
				if (editable.type !== 'multi-select') {
					handleSave({
						...record,
						values,
					});
					toggleEdit();
				} else {
					handleSave({
						...record,
						values: { [editable.selectedValue]: multiSelectValues }
					});
				}
			} catch (errInfo) {
			}
		};
		let tooltipText = ''
		if (record?.[dataIndex] && editable.type === 'multi-select') {
			tooltipText = record[dataIndex].reduce((acc, data) => [...acc, data?.[editable.selectedName]], [])?.join(', ');
		}
		let childNode = children;
		if (editable) {
			const inputType = editable.type || 'text';
			childNode = editing ? (
				inputType === 'time' ? (
					<TimePicker
						style={{ width: '8rem', height: '4rem' }}
						onOpenChange={(isOpen) => isOpen === false && toggleEdit(isOpen)}
						allowClear={false}
						defaultValue={record[dataIndex] && dayjs(record[dataIndex], 'HH:mm')}
						autoFocus={true}
						format="HH:mm"
						onChange={(_, value) => handleTimeChange(dataIndex, value)}
					/>
				) : (
					<Form.Item
						style={{
							margin: 0,
						}}
						rules={[
							{
								pattern: /^\S/,
								message: 'First character cannot be blank.',
							},
						]}
						name={inputType === 'multi-select' ? editable.selectedValue : dataIndex}
					>
						{inputType === 'select' ? (
							<Select
								options={editable?.dropdownData ?? []}
								ref={inputRef}
								style={{ width: '15rem' }}
								autoFocus={true}
								onPressEnter={save}
								onChange={save}
								placeholder="Select a value"
								onBlur={toggleEdit}
							/>
						) : inputType === 'multi-select' ?
							<Select
								options={editable?.dropdownData ?? []}
								ref={inputRef}
								style={{ width: '15rem' }}
								autoFocus={true}
								onPressEnter={save}
								onChange={(values) => setMultiSelectValues(values)}
								placeholder="Select a value"
								onBlur={toggleEdit}
								mode='multiple'
							/> : (
								inputType === 'number' ?
									<InputNumber ref={inputRef} onPressEnter={save} onBlur={toggleEdit} />
									: <Input ref={inputRef} onPressEnter={save} onBlur={toggleEdit} />
							)
						}
					</Form.Item >
				)
			) : (
				<>
					{editable.type !== 'multi-select' ?
						<div className="editable-cell-value-wrap" onClick={toggleEdit}>
							{children}
						</div> :
						<Tooltip placement="topLeft" title={tooltipText}>
							<div className="editable-cell-value-wrap" onClick={toggleEdit}>
								{children}
							</div>
						</Tooltip>
					}
				</>
			);
		}
		return <td {...restProps}>{childNode}</td>;
	};

	const handleSave = (row) => {
		handleEdit && handleEdit(row);
	};
	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};
	const defaultColumns = (col) => {
		if (!col.editable) {
			return col;
		}

		const newCol = {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};

		if (col.children) {
			newCol.children = col.children?.map(defaultColumns);
		}

		return newCol;
	};

	const TableColumns = columns.map(defaultColumns);

	return (
		<>
			{fetchData ? (
				<InfiniteScroll
					dataLength={data.length} // This is important to determine when to fetch more data
					next={!loading && fetchData} // Function to call when reaching the end of the list
					hasMore={hasMoreData} // Boolean to indicate if there is more data to load
				>
					<Table
						columns={TableColumns}
						dataSource={data}
						loading={loading}
						bordered
						onChange={handleTableChange}
						locale={{
							emptyText: <Empty description={emptyText} />,
						}}
						pagination={false}
						className={`${'color_table'}`}
						components={components}
						{...rest}
					/>
					{loading && hasMoreData ? <h6>Loading...</h6> : null}
				</InfiniteScroll>
			) : (
				<Table
					columns={TableColumns}
					dataSource={data}
					loading={loading}
					onChange={handleTableChange}
					locale={{
						emptyText: <Empty description={emptyText} />,
					}}
					className={`${'color_table'}`}
					pagination={false}
					components={components}
					{...rest}
				/>
			)}
		</>
	);
};

TableComponent.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array,
	loading: PropTypes.bool,
	onChange: PropTypes.func,
	tableTitle: PropTypes.string,
	emptyText: PropTypes.string,
};

export default TableComponent;
