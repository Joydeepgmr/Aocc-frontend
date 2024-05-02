import { Empty, Form, Input, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './table.scss';

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
		const inputRef = useRef();
		const form = useContext(EditableContext);
		useEffect(() => {
			if (editing) {
				inputRef.current?.focus();
			}
		}, [editing]);
		const toggleEdit = () => {
			setEditing(!editing);
			form.setFieldsValue({
				[dataIndex]: record[dataIndex],
			});
		};
		const save = async () => {
			try {
				const values = await form.validateFields();
				toggleEdit();
				handleSave({
					...record,
					values,
				});
			} catch (errInfo) {
				console.log('Save failed:', errInfo);
			}
		};
		let childNode = children;
		if (editable) {
			const inputType = editable.type || 'text';
			childNode = editing ? (
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
					name={dataIndex}
				>
					{inputType === 'time' ? (
						<Input type="time" ref={inputRef} format="HH:mm" onPressEnter={save} onBlur={save} />
					) : inputType === 'select' ?
						<Select
							options={editable?.dropdownData ?? []}
							ref={inputRef}
							style={{ width: '15rem' }}
							autoFocus={true}
							onPressEnter={save}
							onChange={save}
							placeholder='Select a value'
							onBlur={save}
						/> : (
							<Input ref={inputRef} onPressEnter={save} onBlur={save} />
						)}
				</Form.Item>
			) : (
				<div className="editable-cell-value-wrap" onClick={toggleEdit}>
					{children}
				</div>
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
						className={`${isColored && 'color_table'}`}
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
