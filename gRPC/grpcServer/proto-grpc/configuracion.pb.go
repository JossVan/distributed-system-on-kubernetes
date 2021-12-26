

package confproto

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)


var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf


const _ = proto.ProtoPackageIsVersion3 

type RequestId struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *RequestId) Reset()         { *m = RequestId{} }
func (m *RequestId) String() string { return proto.CompactTextString(m) }
func (*RequestId) ProtoMessage()    {}
func (*RequestId) Descriptor() ([]byte, []int) {
	return fileDescriptor_af29c3d97c631adc, []int{0}
}

func (m *RequestId) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_RequestId.Unmarshal(m, b)
}
func (m *RequestId) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_RequestId.Marshal(b, m, deterministic)
}
func (m *RequestId) XXX_Merge(src proto.Message) {
	xxx_messageInfo_RequestId.Merge(m, src)
}
func (m *RequestId) XXX_Size() int {
	return xxx_messageInfo_RequestId.Size(m)
}
func (m *RequestId) XXX_DiscardUnknown() {
	xxx_messageInfo_RequestId.DiscardUnknown(m)
}

var xxx_messageInfo_RequestId proto.InternalMessageInfo

func (m *RequestId) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type ReplyInfo struct {
	Info                 string   `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ReplyInfo) Reset()         { *m = ReplyInfo{} }
func (m *ReplyInfo) String() string { return proto.CompactTextString(m) }
func (*ReplyInfo) ProtoMessage()    {}
func (*ReplyInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_af29c3d97c631adc, []int{1}
}

func (m *ReplyInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ReplyInfo.Unmarshal(m, b)
}
func (m *ReplyInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ReplyInfo.Marshal(b, m, deterministic)
}
func (m *ReplyInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ReplyInfo.Merge(m, src)
}
func (m *ReplyInfo) XXX_Size() int {
	return xxx_messageInfo_ReplyInfo.Size(m)
}
func (m *ReplyInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_ReplyInfo.DiscardUnknown(m)
}

var xxx_messageInfo_ReplyInfo proto.InternalMessageInfo

func (m *ReplyInfo) GetInfo() string {
	if m != nil {
		return m.Info
	}
	return ""
}

func init() {
	proto.RegisterType((*RequestId)(nil), "confproto.requestId")
	proto.RegisterType((*ReplyInfo)(nil), "confproto.replyInfo")
}

func init() { proto.RegisterFile("configuracion.proto", fileDescriptor_af29c3d97c631adc) }

var fileDescriptor_af29c3d97c631adc = []byte{
	
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x4e, 0xce, 0xcf, 0x4b,
	0xcb, 0x4c, 0x2f, 0x2d, 0x4a, 0x4c, 0xce, 0xcc, 0xcf, 0xd3, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17,
	0xe2, 0x04, 0x09, 0x82, 0x99, 0x4a, 0xd2, 0x5c, 0x9c, 0x45, 0xa9, 0x85, 0xa5, 0xa9, 0xc5, 0x25,
	0x9e, 0x29, 0x42, 0x7c, 0x5c, 0x4c, 0x99, 0x29, 0x12, 0x8c, 0x0a, 0x8c, 0x1a, 0x9c, 0x41, 0x4c,
	0x99, 0x29, 0x4a, 0xf2, 0x20, 0xc9, 0x82, 0x9c, 0x4a, 0xcf, 0xbc, 0xb4, 0x7c, 0x21, 0x21, 0x2e,
	0x96, 0xcc, 0xbc, 0xb4, 0x7c, 0xa8, 0x34, 0x98, 0x6d, 0xe4, 0xca, 0xc5, 0x9e, 0x9e, 0x5a, 0x02,
	0x96, 0xb6, 0xe2, 0xe2, 0x2a, 0x4a, 0x2d, 0x29, 0x2d, 0xca, 0x03, 0xf3, 0x44, 0xf4, 0xe0, 0x56,
	0xe8, 0xc1, 0xcd, 0x97, 0x42, 0x15, 0x85, 0x1a, 0xac, 0xc4, 0xe0, 0xc4, 0x1d, 0x85, 0x70, 0x51,
	0x12, 0x1b, 0x98, 0x32, 0x06, 0x04, 0x00, 0x00, 0xff, 0xff, 0x5e, 0xc7, 0xeb, 0xf9, 0xba, 0x00,
	0x00, 0x00,
}

var _ context.Context
var _ grpc.ClientConn
const _ = grpc.SupportPackageIsVersion4
type GetInfoClient interface {
	ReturnInfo(ctx context.Context, in *RequestId, opts ...grpc.CallOption) (*ReplyInfo, error)
}

type getInfoClient struct {
	cc *grpc.ClientConn
}

func NewGetInfoClient(cc *grpc.ClientConn) GetInfoClient {
	return &getInfoClient{cc}
}

func (c *getInfoClient) ReturnInfo(ctx context.Context, in *RequestId, opts ...grpc.CallOption) (*ReplyInfo, error) {
	out := new(ReplyInfo)
	err := c.cc.Invoke(ctx, "/confproto.getInfo/returnInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}


type GetInfoServer interface {
	ReturnInfo(context.Context, *RequestId) (*ReplyInfo, error)
}


type UnimplementedGetInfoServer struct {
}

func (*UnimplementedGetInfoServer) ReturnInfo(ctx context.Context, req *RequestId) (*ReplyInfo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ReturnInfo not implemented")
}

func RegisterGetInfoServer(s *grpc.Server, srv GetInfoServer) {
	s.RegisterService(&_GetInfo_serviceDesc, srv)
}

func _GetInfo_ReturnInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestId)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GetInfoServer).ReturnInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/confproto.getInfo/ReturnInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GetInfoServer).ReturnInfo(ctx, req.(*RequestId))
	}
	return interceptor(ctx, in, info, handler)
}

var _GetInfo_serviceDesc = grpc.ServiceDesc{
	ServiceName: "confproto.getInfo",
	HandlerType: (*GetInfoServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "returnInfo",
			Handler:    _GetInfo_ReturnInfo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "configuracion.proto",
}
