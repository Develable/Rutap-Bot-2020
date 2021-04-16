exports.module_use=1; // 이거 끄시면 그대신 콘솔에 애러 출력합니다.

/* `module_use` 비활하시면 이 아래는 무시하셔도 됩니다 */

exports.err_log=1; // 이거 끄시면 로그 안됩니다. 상세 설정은 로그 세팅 참고하세요.
exports.err_name="errs.log"; // 애러로그 파일명. 애러로그는 string으로 저장됩니다. 경로는 일반 로그 따라감.
exports.randomcode_use=1; // 랜덤코드 비활하시면 애러코드 대신에 애러 내용이 같이 첨부됩니다.
exports.embed_title="명령어 수행 도중 문제가 발생했습니다.";
exports.embed_description="문제 내용은 관리진에게 전달이 되었으며, 빠른 시일 내에 해결 될 예정입니다. 문의가 있으시면 아래의 코드를 가지고 관리진에게 문의 해 주세요."; // 애러코드 활성화 했을 때 ==> 애러코드는 설명 바로 아랫줄에 적힙니다
exports.embed_color="#ff3636";