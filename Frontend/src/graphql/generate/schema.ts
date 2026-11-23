export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  Decimal: { input: unknown; output: unknown; }
};

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  customerId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  state?: Maybe<Scalars['String']['output']>;
};

export type AddressFilterInput = {
  addressLine1?: InputMaybe<StringOperationFilterInput>;
  addressLine2?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  customerId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
};

export type AddressSortInput = {
  addressLine1?: InputMaybe<SortEnumType>;
  addressLine2?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  customerId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Address>;
  contactNumber?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDelete: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Maybe<Order>>>;
};

export type CustomerFilterInput = {
  address?: InputMaybe<AddressFilterInput>;
  and?: InputMaybe<Array<CustomerFilterInput>>;
  contactNumber?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDelete?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerFilterInput>>;
  orders?: InputMaybe<ListFilterInputTypeOfOrderFilterInput>;
};

export type CustomerModelInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contactNumber?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerSortInput = {
  address?: InputMaybe<AddressSortInput>;
  contactNumber?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDelete?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfOrderFilterInput = {
  all?: InputMaybe<OrderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OrderFilterInput>;
  some?: InputMaybe<OrderFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrUpdateCustomer?: Maybe<Customer>;
  addOrUpdateOrder?: Maybe<Order>;
  deleteCustomer: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
};


export type MutationAddOrUpdateCustomerArgs = {
  customer?: InputMaybe<CustomerModelInput>;
};


export type MutationAddOrUpdateOrderArgs = {
  order?: InputMaybe<OrderModelInput>;
};


export type MutationDeleteCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['Int']['input'];
};

export type Order = {
  __typename?: 'Order';
  customer?: Maybe<Customer>;
  customerId: Scalars['Int']['output'];
  depositAmount: Scalars['Decimal']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDelivery: Scalars['Boolean']['output'];
  orderDate: Scalars['DateTime']['output'];
  otherNotes?: Maybe<Scalars['String']['output']>;
  status: OrderStatus;
  totalAmount: Scalars['Decimal']['output'];
};

export type OrderFilterInput = {
  and?: InputMaybe<Array<OrderFilterInput>>;
  customer?: InputMaybe<CustomerFilterInput>;
  customerId?: InputMaybe<IntOperationFilterInput>;
  depositAmount?: InputMaybe<DecimalOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDelivery?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<OrderFilterInput>>;
  orderDate?: InputMaybe<DateTimeOperationFilterInput>;
  otherNotes?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<OrderStatusOperationFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
};

export type OrderModelInput = {
  customerId: Scalars['Int']['input'];
  depositAmount: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isDelivery: Scalars['Boolean']['input'];
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  otherNotes?: InputMaybe<Scalars['String']['input']>;
  status: OrderStatus;
  totalAmount: Scalars['Decimal']['input'];
};

export type OrderSortInput = {
  customer?: InputMaybe<CustomerSortInput>;
  customerId?: InputMaybe<SortEnumType>;
  depositAmount?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDelivery?: InputMaybe<SortEnumType>;
  orderDate?: InputMaybe<SortEnumType>;
  otherNotes?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
};

export type OrderStatus =
  | 'COMPLETED'
  | 'DRAFT'
  | 'PENDING'
  | 'SHIPPED';

export type OrderStatusOperationFilterInput = {
  eq?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  neq?: InputMaybe<OrderStatus>;
  nin?: InputMaybe<Array<OrderStatus>>;
};

export type Query = {
  __typename?: 'Query';
  customers?: Maybe<Array<Maybe<Customer>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
};


export type QueryCustomersArgs = {
  order?: InputMaybe<Array<CustomerSortInput>>;
  where?: InputMaybe<CustomerFilterInput>;
};


export type QueryOrdersArgs = {
  order?: InputMaybe<Array<OrderSortInput>>;
  where?: InputMaybe<OrderFilterInput>;
};

export type SortEnumType =
  | 'ASC'
  | 'DESC';

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};
