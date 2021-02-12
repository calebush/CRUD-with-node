 
  addComment:false,
  message:"",
  comments:[],
 
 
 
 // Loan Comments Section
  handleCommentChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };
  commentsToggle = () => {
    this.getLoanComments();
    this.setState({ commentsModal: !this.state.commentsModal });
  };
  toggleAddComment=()=>{
    this.setState({addComment: !this.state.addComment})
  }
  cancelCommentToggle = () => {
    this.toggleAddComment();
    this.setState({ commentsModal: !this.state.commentsModal });
  };
  addComment=()=>{
    if(this.state.message===""){
      this.env.setErrors("Please fill the required field", "info")
      this.env.clearErrors();
    }
    else{
      let data = {
        message:this.state.message,
        accountNumber:this.state.account.split("|")[1].trim(),
        loanProductCode:this.state.prodCode,
      }
      axios.post(`https://api.cemascore.com/api/v1/cemascore/create-loan-comment`,data, this.services.CONFIG)
          .then(()=>{
            this.setState({addComment:false})
            this.getLoanComments();
          })
    }
  }
  getLoanComments=()=>{
    axios.get(`https://api.cemascore.com/api/v1/cemascore/get-loan-comments?accountNumber=${this.state.account.split("|")[1].trim()}&loanProductCode=${this.state.productCode}`,
        this.env.CONFIG)
        .then((response)=>{
          this.setState({comments:response.data})
        })
  }




   {/*Comments Modal*/}
   <Modal
   show={this.state.commentsModal}
   style={{ marginTop: "80px" }}
   animation={false}
   toggle={this.toggle}
>
 <Modal.Body>
   {!this.state.addComment?
       <>
         <div>
           <p>
             List of Messages
           </p>
         </div> <br />
         <span className="pull-right">
            <input
                type="submit"
                onClick={this.toggleAddComment}
                value="Add"
                className="btn btn-xs btn-success"
                style={{
                  display: "block",
                  marginRight: "10px",
                }}
            />
         </span>
       </>
       :""
   }

   {this.state.addComment?
       <div>
     <textarea
         type="text"
         id="message"
         name="message"
         onChange={this.handleCommentChange}
         className="form-control"
     /><br/>
         <span className="pull-right">
            <input
                type="submit"
                onClick={this.addComment}
                value="Submit"
                className="btn btn-xs btn-success"
                style={{
                  display: "block",
                  marginRight: "10px",
                }}
            />
         </span>
       </div>
       :""}
 </Modal.Body>
 <Modal.Footer>
   <span className="pull-left">
            <input
                type="submit"
                onClick={this.cancelCommentToggle}
                value="Cancel"
                className="btn btn-xs btn-danger"
                style={{
                  display: "block",
                  marginRight: "10px",
                }}
            />
         </span>
 </Modal.Footer>
</Modal>